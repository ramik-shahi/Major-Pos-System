// user-datasource.ts
export interface Employee {
  name: string;
  id: number;
  panNumber: string;
  address: string;
  phoneNumber: string;
  position: string;
}

export const employees: Employee[] = [
  { name: "John Doe", id: 1, panNumber: "ABCDE1234F", address: "123 Main St, City, Country", phoneNumber: "123-456-7890", position: "Software Engineer" },
  { name: "Alice Smith", id: 2, panNumber: "FGHIJ5678K", address: "456 Elm St, Town, Country", phoneNumber: "234-567-8901", position: "Project Manager" },
  { name: "Bob Johnson", id: 3, panNumber: "KLMNO9876P", address: "789 Maple St, Village, Country", phoneNumber: "345-678-9012", position: "Business Analyst" },
  { name: "Charlie Brown", id: 4, panNumber: "PQRST4321U", address: "101 Oak St, Hamlet, Country", phoneNumber: "456-789-0123", position: "Quality Assurance" },
  { name: "David Wilson", id: 5, panNumber: "UVWXY6543Z", address: "202 Pine St, Metropolis, Country", phoneNumber: "567-890-1234", position: "HR Manager" },
  { name: "Eva Green", id: 6, panNumber: "ABCDE9876Y", address: "303 Cedar St, Borough, Country", phoneNumber: "678-901-2345", position: "Finance Officer" }
];
