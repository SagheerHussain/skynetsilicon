"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

const DashboardPage = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [errorUsers, setErrorUsers] = useState("");
  const [errorCustomers, setErrorCustomers] = useState("");

  // Fetch user count from API
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        setLoadingUsers(true);
        const response = await fetch("/api/googleSheets/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const users = await response.json();
        setUserCount(users.length);
      } catch (err: any) {
        console.error("Error fetching user count:", err.message);
        setErrorUsers("Failed to load user count.");
      } finally {
        setLoadingUsers(false);
      }
    };

    const fetchCustomerCount = async () => {
      try {
        setLoadingCustomers(true);
        const response = await fetch("/api/googleSheets/customers");
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const customers = await response.json();
        setCustomerCount(customers.length);
      } catch (err: any) {
        console.error("Error fetching customer count:", err.message);
        setErrorCustomers("Failed to load customer count.");
      } finally {
        setLoadingCustomers(false);
      }
    };

    fetchUserCount();
    fetchCustomerCount();
  }, []);

  const chartDataUsers = [
    {
      label: "Total Users",
      count: userCount,
      fill: "hsl(var(--chart-2))" // Custom theme color
    }
  ];

  const chartDataCustomers = [
    {
      label: "Total Customers",
      count: customerCount,
      fill: "hsl(var(--chart-3))" // Custom theme color
    }
  ];

  const chartConfig = {
    count: {
      label: "Count"
    }
  } satisfies ChartConfig;

  return (
    <ContentLayout title="Dashboard">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Dashboard Content */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Total Users Chart */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Live data visualization</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            {loadingUsers ? (
              <p>Loading...</p>
            ) : errorUsers ? (
              <p className="text-red-500">{errorUsers}</p>
            ) : (
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <RadialBarChart
                  data={chartDataUsers}
                  startAngle={90}
                  endAngle={450}
                  innerRadius={80}
                  outerRadius={110}
                >
                  <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[86, 74]}
                  />
                  <RadialBar
                    dataKey="count"
                    background
                    cornerRadius={10}
                    fill="var(--chart-color)"
                  />
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-4xl font-bold"
                              >
                                {userCount}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Users
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Live user data fetched from Google Sheets
            </div>
          </CardFooter>
        </Card>

        {/* Total Customers Chart */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Total Customers</CardTitle>
            <CardDescription>Live data visualization</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            {loadingCustomers ? (
              <p>Loading...</p>
            ) : errorCustomers ? (
              <p className="text-red-500">{errorCustomers}</p>
            ) : (
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <RadialBarChart
                  data={chartDataCustomers}
                  startAngle={90}
                  endAngle={450}
                  innerRadius={80}
                  outerRadius={110}
                >
                  <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[86, 74]}
                  />
                  <RadialBar dataKey="count" background cornerRadius={10} />
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-4xl font-bold"
                              >
                                {customerCount}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Customers
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 3.8% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Live customer data fetched from Google Sheets
            </div>
          </CardFooter>
        </Card>
      </div>
    </ContentLayout>
  );
};

export default DashboardPage;
