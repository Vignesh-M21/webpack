import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginUser";
import React from "react";
import "@testing-library/jest-dom";

describe("LoginForm Component", () => {
  test("renders the form correctly", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("displays error for empty email", () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    expect(screen.getByText(/Email is required./i)).toBeInTheDocument();
  });

  test("displays error for invalid email format", () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    expect(screen.getByText(/Invalid email format./i)).toBeInTheDocument();
  });

  test("displays error for empty password", () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    expect(screen.getByText(/Password is required./i)).toBeInTheDocument();
  });

  test("displays error for short password", () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    expect(
      screen.getByText(
        /Password must be at least 8 characters long, include one uppercase letter, one symbol, and one number./i
      )
    ).toBeInTheDocument();
  });

  test("displays success message for valid inputs", () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "example@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "Password1!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    expect(screen.getByText(/Login successful!/i)).toBeInTheDocument();
  });

  test("clears error messages when inputs are corrected", () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(screen.getByText(/Invalid email format./i)).toBeInTheDocument();

    // Correct the email input
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "example@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Error message should no longer be displayed
    expect(
      screen.queryByText(/Invalid email format./i)
    ).not.toBeInTheDocument();
  });

  test("does not submit the form when there are validation errors", () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Ensure error messages are displayed
    expect(screen.getByText(/Invalid email format./i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Password must be at least 8 characters long, include one uppercase letter, one symbol, and one number./i
      )
    ).toBeInTheDocument();

    // Ensure success message is not displayed
    expect(screen.queryByText(/Login successful!/i)).not.toBeInTheDocument();
  });

  test("trims leading and trailing spaces in email and password fields", () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "  example@example.com  " },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "  Password1!  " },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Ensure success message is displayed
    expect(screen.getByText(/Login successful!/i)).toBeInTheDocument();
  });

  test("handles rapid input changes correctly", () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);

    // Simulate rapid input changes
    fireEvent.change(emailInput, { target: { value: "example@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });

    // Ensure inputs are updated correctly
    expect(emailInput.value).toBe("example@example.com");
    expect(passwordInput.value).toBe("Password1!");
  });
});
