import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ connections: [] }]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders the home page container", async () => {
  const { container } = render(<App />);

  expect(container.querySelector(".App")).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/digital profile/i)).toBeInTheDocument();
    expect(screen.getByText(/social links/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
  });
});

test("shows an error state when the profile request fails", async () => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: false }));

  render(<App />);

  expect(screen.getByText(/loading profile/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/unable to load social links/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });
});
