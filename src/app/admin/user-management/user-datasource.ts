import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/service/api.service';

export interface Employee {
  user_name: string;
  user_pic: string;
  _id: number;
  pan_no: string;
  address: string;
  user_phone_no: string;
  user_role: string;
}

/**
 * Data source for the Category view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CategoryDataSource extends DataSource<Employee> {
  private dataSubject = new BehaviorSubject<Employee[]>([]);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private api: ApiService) {
    super();
    const resId = sessionStorage.getItem('restaurant_id');
    this.fetchData(resId);
  }

  /**
   * Fetch data from the API and update the dataSubject.
   */
  private fetchData(restaurantId: any): void {
    this.api.getUser(restaurantId).subscribe(
      (res: Employee[]) => {
        this.dataSubject.next(res);
      },
      error => {
        console.error('Error fetching data', error);
        // Handle error appropriately
      }
    );
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Employee[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(this.dataSubject.asObservable(), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.dataSubject.getValue()]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   * Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.dataSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Employee[]): Employee[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Employee[]): Employee[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'user_name': return compare(a.user_name, b.user_name, isAsc);
        case 'id': return compare(+a._id, +b._id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
