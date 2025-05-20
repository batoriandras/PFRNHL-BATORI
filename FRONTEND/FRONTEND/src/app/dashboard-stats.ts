export interface DashboardStats {
    activeProjects: number;
    completedOrders: number;
    totalOrders: number;
    totalServices: number;
    totalEmployees: number;
    averageCompletionTime: number;
    topServices: {
        serviceName: string;
        orderCount: number;
    }[];
    employeeCountByService: {
        serviceName: string;
        employeeCount: number;
    }[];
    monthlyOrderStats: {
        year: number;
        month: number;
        orderCount: number;
    }[];
    topEmployee: {
        fullName: string;
        serviceCount: number;
    };
}
