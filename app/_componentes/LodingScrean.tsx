import { Card, Skeleton } from "@heroui/react";

export default function LodingScrean() {
  return (
    <>
      {Array.from({ length: 7 }).map((_, index) => (
        <Card key={index} className="w-full mb-2 space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-72 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </Card>
      ))}
    </>
  );
}
