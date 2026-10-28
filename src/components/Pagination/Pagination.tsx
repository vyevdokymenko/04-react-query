import ReactPaginateModule from "react-paginate";
import type {ReactPaginateProps} from "react-paginate";
import type {ComponentType} from "react";


type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  onPageChange: NonNullable<ReactPaginateProps["onPageChange"]>;
  forcePage: number;
  containerClassName: string;
  activeClassName: string;
  nextLabel?: string;
  previousLabel?: string;
}

function Pagination({
                      pageCount,
                      pageRangeDisplayed = 5,
                      marginPagesDisplayed = 1,
                      onPageChange,
                      forcePage,
                      containerClassName,
                      activeClassName,
                      nextLabel = "→",
                      previousLabel = "←",
                    }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={onPageChange}
      forcePage={forcePage}
      containerClassName={containerClassName}
      activeClassName={activeClassName}
      nextLabel={nextLabel}
      previousLabel={previousLabel}
    />
  );
}

export default Pagination;