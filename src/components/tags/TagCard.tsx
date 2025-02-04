import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Tag {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface TagCardProps {
  tag: Tag;
}

const TagCard: React.FC<TagCardProps> = ({ tag }) => {
  return (
    <div
      key={tag.id}
      className="flex items-center justify-between p-2 bg-secondary rounded-lg"
    >
      <div>
        <Badge variant="outline" className="mb-1">
          ID: {tag.id}
        </Badge>
        <h3 className="text-lg font-semibold">{tag.name}</h3>
        {/* <p className="text-sm text-muted-foreground">User ID: {tag.userId}</p> */}
      </div>
      <div className="text-right text-sm text-muted-foreground">
        <p>Created: {new Date(tag.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(tag.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TagCard;
