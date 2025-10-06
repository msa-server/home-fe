
import CircleLoading from "@/component/CircleLoading";

export default function TestPage() {
  return (
      <>
        <CircleLoading size={72}  dotCount={8} duration={1.0} clockwise={false} />
        <h1> h1 </h1>
        <h2> h2 </h2>
        <h3> h3 </h3>
        <h4> h4 </h4>
        <h5> h5 </h5>
        <h6> h6 </h6>
        <ol>
          <li>hello1</li>
          <li>hello2</li>
          <li>hello3</li>
        </ol>
      </>
  );
}
