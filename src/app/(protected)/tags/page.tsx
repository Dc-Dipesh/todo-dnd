import { getTags } from "@/app/actions/tags";
import TagCard from "@/components/tags/TagCard";
import TagForm from "@/components/tags/TagForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function TagsPage() {
  const tags = await getTags();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tags</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Tags</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <TagForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full mt-5 grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
        {tags.map((tag) => (
          <TagCard key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
}
