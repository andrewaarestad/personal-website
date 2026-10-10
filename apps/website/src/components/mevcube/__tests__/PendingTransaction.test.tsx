import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PendingTransaction } from "../PendingTransaction";

describe("PendingTransaction", () => {
  it("shows an empty move() call and a hint when nothing is queued", () => {
    render(<PendingTransaction moves={[]} solves={false} onDiscard={() => {}} />);
    expect(screen.getByText(/move\("/)).toHaveTextContent('move("")');
    expect(screen.getByText(/Turn a layer to queue it/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Discard" })).not.toBeInTheDocument();
  });

  it("renders the contract calldata and one chip per turn", () => {
    render(<PendingTransaction moves={["R", "U'", "F2"]} solves={false} onDiscard={() => {}} />);
    expect(screen.getByText(/move\("/)).toHaveTextContent('move("RuFF")');
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["R", "U'", "F2"]);
    expect(screen.getByText(/3 turns/)).toBeInTheDocument();
  });

  it("announces when the queued turns solve the cube", () => {
    render(<PendingTransaction moves={["R'"]} solves onDiscard={() => {}} />);
    expect(screen.getByText(/would emit Solved/)).toBeInTheDocument();
  });

  it("calls onDiscard", () => {
    const onDiscard = vi.fn();
    render(<PendingTransaction moves={["R"]} solves={false} onDiscard={onDiscard} />);
    fireEvent.click(screen.getByRole("button", { name: "Discard" }));
    expect(onDiscard).toHaveBeenCalledOnce();
  });
});
