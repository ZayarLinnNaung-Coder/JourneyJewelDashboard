import { Link } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { slideNav } from "@/common/dummy";
import { useLocation } from "react-router";

const NavLayout = () => {
  const { pathname: pathData } = useLocation();

  const pathParam = "/" + pathData.split("/")[1];

  const pathname = pathParam == "/role" ? "/team" : pathParam;

  const mainAcc = slideNav.map((da) =>
    da.children.some((item) => item.link == pathname)
  );

  // console.log(pathname.split("/"));

  return (
    <div className=" space-y-5  ">
      <Accordion
        collapsible
        defaultValue={slideNav[0]?.id.toString()}
        type="single"
      >
        {slideNav.map((navLink, idx) => (
          <AccordionItem
            className="border-0 py-0"
            value={navLink.id.toString()}
            key={navLink.id}
          >
            <AccordionTrigger className=" py-2 px-5 font-[400] text-[15px] hover:no-underline">
              <div
                className={`flex  items-center gap-3 ${
                  mainAcc[idx] && "text-dms-50"
                }`}
              >
                {navLink.icon ? navLink.icon : <></>}
                <p>{navLink.group}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className=" pb-0  px-0 ">
              {navLink.children.map((nav) => (
                <div
                  key={nav.id}
                  className={`flex relative pl-16 items-center gap-3 last:mb-0  py-3 ${
                    pathname == nav.link && "  bg-dms-25 text-dms-50"
                  }`}
                >
                  <Link to={nav.link}>{nav.name}</Link>
                  {pathname == nav.link && (
                    <div className=" absolute right-0 h-full w-[4px] bg-dms-50"></div>
                  )}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default NavLayout;
