import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";

interface ICategory {
  id: number;
  name: string;
  color: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CategoryCardProps {
  category: ICategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const createdDate = new Date(category.createdAt).toLocaleDateString();
  const updatedDate = new Date(category.updatedAt).toLocaleDateString();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback
            style={{ backgroundColor: category.color }}
          ></AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{category.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <time>Created: {createdDate}</time>
        </div>
        <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <time>Updated: {updatedDate}</time>
        </div>
      </CardContent>
    </Card>
  );
}
