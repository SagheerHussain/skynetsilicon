"use client";

import useSWR from "swr";
import Link from "next/link";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import AddCustomerButton from "@/components/customers/AddCustomerButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// Define the type for customer objects
type Customer = {
  id: string;
  name: string;
  email: string;
};

// SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CustomersPage() {
  // SWR hook for fetching customers
  const {
    data: customers,
    error,
    mutate
  } = useSWR<Customer[]>("/api/googleSheets/customers", fetcher);

  // Handle new customer addition
  const handleCustomerAdded = (newCustomer: Customer) => {
    // Optimistically update the data
    mutate((prevCustomers) => [...(prevCustomers || []), newCustomer], false);
  };

  if (error) return <p>Failed to load customers. Please try again later.</p>;
  if (!customers) return <p>Loading customers...</p>;

  return (
    <ContentLayout title="Customers">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Customers</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PlaceholderContent />

      <div className="border text-card-foreground shadow rounded-lg border-none mt-6">
        <div className="customer-content p-6">
          <div className="w-full flex justify-end mb-4">
            <AddCustomerButton onCustomerAdded={handleCustomerAdded} />
          </div>

          {/* Customers Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ContentLayout>
  );
}
