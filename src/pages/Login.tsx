import { type ChangeEvent, type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft01Icon, Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import BrandMark from "../components/BrandMark";
import { useTheme } from "../components/theme-provider";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";

type LoginValues = {
  email: string;
  password: string;
};

type LoginErrors = Partial<Record<keyof LoginValues, string>>;

const initialValues: LoginValues = {
  email: "",
  password: "",
};

function Login() {
  const { theme, setTheme } = useTheme();
  const [values, setValues] = useState<LoginValues>(initialValues);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof LoginValues) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      setValues((currentValues) => ({ ...currentValues, [field]: nextValue }));
      setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
      setFormMessage(null);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: LoginErrors = {};

    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    }

    if (!values.password.trim()) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setFormMessage("Sign-in is being finalized. Your account experience will be available shortly.");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.16),_transparent_62%)]" />
        <div className="absolute bottom-0 left-1/2 h-96 w-full max-w-5xl -translate-x-1/2 bg-[radial-gradient(circle,_hsl(var(--accent)/0.18),_transparent_68%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6">
        <header className="flex items-center justify-between gap-3 rounded-full border border-border/70 bg-background/80 px-3 py-2 shadow-sm backdrop-blur sm:px-4">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="rounded-full px-3">
              <Link to="/">
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  data-icon="inline-start"
                  strokeWidth={1.8}
                />
                Back
              </Link>
            </Button>
            <BrandMark subtitle="Connect With Me in one shareable link" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-full px-4"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <HugeiconsIcon
              icon={theme === "dark" ? Sun03Icon : Moon02Icon}
              data-icon="inline-start"
              strokeWidth={1.8}
            />
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
        </header>

        <section className="grid flex-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          <Card className="border-border/70 bg-card/80">
            <CardHeader className="flex flex-col gap-4">
              <Badge variant="secondary" className="w-fit rounded-full px-4 py-1.5">
                Welcome back
              </Badge>
              <CardTitle className="text-4xl sm:text-5xl">
                Return to your Connect With Me page
              </CardTitle>
              <CardDescription className="max-w-xl text-base leading-7 sm:text-lg">
                Sign in to manage your links, refresh your public profile, and keep your shared page working everywhere you post it.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Card className="border-border/70 bg-background/60">
                <CardContent className="flex flex-col gap-2 p-5">
                  <p className="text-sm font-medium text-foreground">
                    What you will manage
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Update featured destinations, keep your page current, and guide people to the places that matter most.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/90">
            <CardHeader className="flex flex-col gap-3">
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Sign in with the email and password connected to your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field data-invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <FieldContent>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={handleChange("email")}
                        aria-invalid={!!errors.email}
                      />
                      <FieldDescription>
                        Use the email address associated with your profile.
                      </FieldDescription>
                      <FieldError>{errors.email}</FieldError>
                    </FieldContent>
                  </Field>

                  <Field data-invalid={!!errors.password}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <FieldContent>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Your password"
                        value={values.password}
                        onChange={handleChange("password")}
                        aria-invalid={!!errors.password}
                      />
                      <FieldDescription>
                        Secure sign-in is the next step being finalized for launch.
                      </FieldDescription>
                      <FieldError>{errors.password}</FieldError>
                    </FieldContent>
                  </Field>
                </FieldGroup>

                {formMessage ? (
                  <Alert>
                    <AlertTitle>Almost ready</AlertTitle>
                    <AlertDescription>{formMessage}</AlertDescription>
                  </Alert>
                ) : null}

                <CardFooter className="flex flex-col items-stretch gap-3 p-0">
                  <Button type="submit" className="rounded-2xl">
                    Continue
                  </Button>
                  <Button asChild variant="ghost" className="rounded-2xl">
                    <Link to="/users">Need an account? Sign up</Link>
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

export default Login;
