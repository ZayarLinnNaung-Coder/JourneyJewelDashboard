import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";

interface PaginationProps {
  total: number;
  page: number;
  handlePage: (num: number) => void;
}

export default function Paginations({
  total,
  page,
  handlePage,
}: PaginationProps) {
  const generatePageArray = () => {
    const pageArray = [];
    for (let i = 1; i <= total; i++) {
      if (i <= 1 || i >= total || (i >= page - 1 && i <= page + 1)) {
        pageArray.push(i);
      } else if (pageArray[pageArray.length - 1] !== "ellipsis") {
        pageArray.push("ellipsis");
      }
    }
    return pageArray;
  };

  const changePage = (p: number) => {
    if (p >= 1 && p <= total) {
      handlePage(p);
    }
  };

  return (
    <Pagination className=" flex justify-end py-5">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant={"ghost"}
            onClick={() => changePage(page - 1)}
            className={`cursor-pointer ${
              page <= 1 &&
              "text-muted-foreground hover:text-muted-foreground !cursor-not-allowed"
            }`}
          >
            {"<"}
          </Button>
        </PaginationItem>
        {generatePageArray().map((num, index) => (
          <PaginationItem key={index}>
            {num === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={page == num}
                onClick={() =>
                  num !== "ellipsis" ? changePage(Number(num)) : null
                }
                className={` cursor-pointer ${num == page && "active"}`}
              >
                {num}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => changePage(page + 1)}
            className={`cursor-pointer ${
              page >= total &&
              "text-muted-foreground hover:text-muted-foreground !cursor-not-allowed"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
