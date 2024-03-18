import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PostRow } from "../PostRow";

describe("PostRow", () => {
  it("should render title and body", () => {
    const { container } = render(
      <BrowserRouter>
        <PostRow
          userId={1}
          id={1}
          title={"Title"}
          body={"Body"}
          propsMessage={"Hello from"}
        />
      </BrowserRouter>,
    );
    expect(container).toHaveTextContent(/Title/i);
    expect(container).toHaveTextContent(/Body/i);

    //TODO spy on console.log, and check if we have the correct console.log(${propsmessage} ${componentName})
    //TODO mock and spy on useNavigate to confirm if we are redirecting to the desired page.
  });
});
