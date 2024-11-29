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
import AddUserButton from "@/components/users/AddUserButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

type User = {
  id: string;
  name: string;
  email: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersPage() {
  const {
    data: users,
    error,
    mutate
  } = useSWR<User[]>("/api/googleSheets/users", fetcher);

  const handleUserAdded = (newUser: User) => {
    // Optimistically update the data
    mutate((prevUsers) => [...(prevUsers || []), newUser], false);
  };

  if (error) return <p>Failed to load users. Please try again later.</p>;
  if (!users) return <p>Loading users...</p>;

  return (
    <ContentLayout title="Users">
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
            <BreadcrumbPage>Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PlaceholderContent />

      <div className="border text-card-foreground shadow rounded-lg border-none mt-6">
        <div className="user-content p-6">
          <div className="w-full flex justify-end mb-4">
            <AddUserButton onUserAdded={handleUserAdded} />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ContentLayout>
  );
}
