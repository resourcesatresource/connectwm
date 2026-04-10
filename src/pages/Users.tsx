import { type ChangeEvent, type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft01Icon,
  Moon02Icon,
  Sun03Icon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import BrandMark from "../components/BrandMark";
import { API } from "../configs";
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

type SignupValues = {
  name: string;
  email: string;
  password: string;
};

type SignupErrors = Partial<Record<keyof SignupValues, string>>;

const initialValues: SignupValues = {
  name: "",
  email: "",
  password: "",
};

function Users() {
  const { theme, setTheme } = useTheme();
  const [values, setValues] = useState<SignupValues>(initialValues);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const nextErrors: SignupErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!values.password) {
      nextErrors.password = "Password is required.";
    } else if (values.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange =
    (field: keyof SignupValues) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      setValues((currentValues) => ({
        ...currentValues,
        [field]: nextValue,
      }));

      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);
    setFormError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(API.BE.USERS.PROD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          responseData?.message || "Unable to create your account right now."
        );
      }

      setFormMessage("Your account has been created. Next, you can start building the page you want to share.");
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Unable to create your account right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.16),_transparent_62%)]" />
        <div className="absolute bottom-0 left-1/2 h-96 w-full max-w-5xl -translate-x-1/2 bg-[radial-gradient(circle,_hsl(var(--accent)/0.18),_transparent_68%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6">
        <header className="flex items-center justify-between gap-3 rounded-full border border-border/70 bg-background/80 px-3 py-2 shadow-sm backdrop-blur sm:px-4">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="rounded-full px-3">
              <Link to="/">
                <HugeiconsIcon icon={ArrowLeft01Icon} data-icon="inline-start" strokeWidth={1.8} />
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

        <section className="grid flex-1 items-center gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <Card className="border-border/70 bg-card/80">
            <CardHeader className="flex flex-col gap-4">
              <Badge variant="secondary" className="w-fit rounded-full px-4 py-1.5">
                Get started
              </Badge>
              <CardTitle className="text-4xl sm:text-5xl">
                Create your Connect With Me account
              </CardTitle>
              <CardDescription className="max-w-xl text-base leading-7 sm:text-lg">
                Start building a page people can open in one tap to find your best links, content, and contact points.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-start gap-4 rounded-3xl border border-border/70 bg-background/70 p-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-foreground">
                    Make it easy to connect
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Set up your account and get ready to share one polished page instead of a scattered list of URLs.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="border-border/70 bg-background/60">
                  <CardContent className="flex flex-col gap-2 p-5">
                    <p className="text-sm font-medium text-foreground">Creator-ready</p>
                    <p className="text-sm text-muted-foreground">
                      Build a page that feels personal, polished, and easy to share.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/70 bg-background/60">
                  <CardContent className="flex flex-col gap-2 p-5">
                    <p className="text-sm font-medium text-foreground">Audience-friendly</p>
                    <p className="text-sm text-muted-foreground">
                      Give visitors one simple destination for everything you want them to see.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/70 bg-background/60">
                  <CardContent className="flex flex-col gap-2 p-5">
                    <p className="text-sm font-medium text-foreground">Easy to update</p>
                    <p className="text-sm text-muted-foreground">
                      Refresh your links any time without changing the page you already share.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/90">
            <CardHeader className="flex flex-col gap-3">
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Create your account and start building your Connect With Me page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field data-invalid={!!errors.name}>
                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                    <FieldContent>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Aarav Mehta"
                        value={values.name}
                        onChange={handleChange("name")}
                        aria-invalid={!!errors.name}
                      />
                      <FieldDescription>
                        This is the public-facing name for the account owner.
                      </FieldDescription>
                      <FieldError>{errors.name}</FieldError>
                    </FieldContent>
                  </Field>

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
                        We will use this for account access and future auth steps.
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
                        placeholder="Minimum 8 characters"
                        value={values.password}
                        onChange={handleChange("password")}
                        aria-invalid={!!errors.password}
                      />
                      <FieldDescription>
                        Use at least 8 characters to start with a valid credential.
                      </FieldDescription>
                      <FieldError>{errors.password}</FieldError>
                    </FieldContent>
                  </Field>
                </FieldGroup>

                {formError ? (
                  <Alert variant="destructive">
                    <AlertTitle>Signup failed</AlertTitle>
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                ) : null}

                {formMessage ? (
                  <Alert>
                    <AlertTitle>Signup complete</AlertTitle>
                    <AlertDescription>{formMessage}</AlertDescription>
                  </Alert>
                ) : null}

                <CardFooter className="flex flex-col items-stretch gap-3 p-0">
                  <Button type="submit" className="rounded-2xl" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : "Create account"}
                  </Button>
                  <Button asChild variant="ghost" className="rounded-2xl">
                    <Link to="/">Continue as guest</Link>
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

export default Users;
