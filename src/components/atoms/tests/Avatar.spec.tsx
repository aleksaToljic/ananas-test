import { render } from "@testing-library/react";
import { Avatar } from "../Avatar";

describe("Avatar", () => {
  it("should render First name initial (first char)", () => {
    const { container, rerender } = render(
      <Avatar name={"Aleksa Toljic"} propsMessage={"Hello from"} />,
    );
    expect(container).toHaveTextContent(/A/i);

    rerender(<Avatar name={"Nemanja Toljic"} propsMessage={"Hello from"} />);

    expect(container).not.toHaveTextContent(/A/i);

    expect(container).toHaveTextContent(/N/i);

    //TODO spy on console.log, and check if we have the correct console.log(${propsmessage} ${componentName})
  });
});
