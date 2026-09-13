export declare const categoryService: {
    createCategory: (name: string) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        icon: string | null;
    }>;
    getAllCategory: () => Promise<({
        services: ({
            technician: {
                experience: number;
                hourlyRate: number;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    role: import("../../../generated/prisma/enums").Role;
                    activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
                    createdAt: Date;
                    updatedAt: Date;
                };
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            categoryId: string;
            title: string;
            description: string;
            price: number;
            duration: number;
            rating: number;
            isActive: boolean;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        icon: string | null;
    })[]>;
};
//# sourceMappingURL=category.service.d.ts.map