import { PacmanLoader } from "react-spinners";

export default ({ className }: { className?: string }) => (
  <div
    className={
      className
        ? className
        : "fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
    }
  >
    <PacmanLoader color="#ffcb05"  />
  </div>
);
