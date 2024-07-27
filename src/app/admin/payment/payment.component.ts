import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  stripe!: Stripe | null;  
  elements!: any;
  card: any;
  clientSecret!: string;

  selectedPaymentMethod!: string;
  tableId!: any;
  resid: any = sessionStorage.getItem('restaurant_id');
  status: any;
  total: any;

  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.route.paramMap.subscribe(params => {
      this.tableId = params.get('id');
      this.total = params.get('total');
      console.log(this.tableId);
      console.log(this.total);
    });
  }

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51NWB9OBaidl5YFJA3MXkB5RLJSmnxQ8bVR4JwEHaMGgcQSdBwy3uRdXhAcHceDqz6cyhEVQmLArESF0fznmlFW8e005eKPrOlg');
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    } else {
      console.error('Stripe failed to load.');
      // Handle the case where Stripe fails to load
    }
  }

  proceed() {
    if (this.selectedPaymentMethod === '3') {
      const dataobj = {
        restaurant_id: this.resid,
        table_name: this.tableId,
        total: this.total,
        channel: 'cash'
      };

      this.api.billGeneration(dataobj).subscribe(res => {
        console.log(res);
        if (res.bill_status === 'processing') {
          this.status = 'Done';
        }
      });
    }

    
      const dataobj = {
        restaurant_id: this.resid,
        table_name: this.tableId,
        total: this.total,
        channel: 'online-payment'
      };

      this.api.billGeneration(dataobj).pipe(
        switchMap((res: any) => {
          console.log(res);
          const bill_id = res._id;
          console.log("BILL status", res.bill_status);

          if (res.bill_status === "processing") {
            const paymentobj = {
              amount: this.total * 100,
              currency: 'usd',
              orderId: bill_id
            };

            return this.api.Client(paymentobj);
          } else {
            console.warn("Bill status is not 'processing'. Aborting payment process.");
            return of(null);
          }
        }),
        catchError((error: any) => {
          console.error("An error occurred:", error);
          return of(null);
        })
      ).subscribe(
        (paymentRes: any) => {
          if (paymentRes && this.stripe) {
            console.log(paymentRes);
            this.clientSecret = paymentRes.clientSecret;

            this.stripe.confirmCardPayment(this.clientSecret, {
              payment_method: {
                card: this.card, // Ensure this.card is a Stripe element object
                billing_details: {
                  name: 'Samrapan G',
                },
              }
            }).then((result: any) => {
              if (result.error) {
                console.error(result.error.message);
              } else {
                if (result.paymentIntent.status === 'succeeded') {
                  console.log('Payment successful!');
                  // Handle successful payment
                }
              }
            });
          }
        },
        error => {
          console.error('Error creating PaymentIntent', error);
        }
      );
    }
  
}
