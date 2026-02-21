import  {Skeleton} from "@heroui/skeleton";

function ReviewsLoding() {
  return (
    <div className="md:w-[50%] w-full flex items-center gap-3 mt-2 border-1 border-gray-300 rounded-xl">
      <div className="w-full flex flex-col gap-2">
        <div className="">
          <Skeleton className="h-3 w-[30%] rounded-lg mt-1" />
          <Skeleton className="h-3 w-[30%] rounded-lg mt-1" />
        </div>
        <Skeleton className="h-5 w-3/5 rounded-lg mt-1" />
        <Skeleton className="h-7 w-4/5 rounded-lg " />
      </div>
    </div>
  );
}

export default ReviewsLoding;
