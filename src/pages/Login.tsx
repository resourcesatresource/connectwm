import { type ChangeEvent, type FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { API } from "../configs";
import { useAuth } from "../context/AuthContext";
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
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginValues>(initialValues);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange =
    (field: keyof LoginValues) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      setValues((currentValues) => ({ ...currentValues, [field]: nextValue }));
      setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
      setFormMessage(null);
      setFormError(null);
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);
    setFormError(null);

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

    setIsSubmitting(true);

    try {
      const response = await fetch(API.BE.AUTH.PROD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          responseData?.message || "Invalid email or password. Please try again."
        );
      }

      if (responseData?.secureToken && responseData?.user) {
        login(responseData.secureToken, responseData.user);
        navigate("/dashboard");
      } else {
        throw new Error("Authentication failed. Invalid response structure.");
      }
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
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

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6">
        <Header />

        <section className="grid flex-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          <Card className="border-border/70 bg-card/80">
            <CardHeader className="flex flex-col gap-4">
              <Badge variant="secondary" className="w-fit rounded-full px-4 py-1.5">
                Ready to roll
              </Badge>
              <CardTitle className="text-4xl sm:text-5xl">
                Access your Connect With Me dashboard
              </CardTitle>
              <CardDescription className="max-w-xl text-base leading-7 sm:text-lg">
                Sign in to customize your links, update your profile, and see how your audience is connecting with you.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Card className="border-border/70 bg-background/60">
                <CardContent className="flex flex-col gap-2 p-5">
                  <p className="text-sm font-medium text-foreground">
                    Complete control
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Everything you need to manage your personal shareable page is right here. Keep your links fresh and your profile updated.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/90">
            <CardHeader className="flex flex-col gap-3">
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your account details to access your dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field data-invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <FieldContent>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="alex@example.com"
                        value={values.email}
                        onChange={handleChange("email")}
                        aria-invalid={!!errors.email}
                      />
                      <FieldDescription>
                        The email you used during registration.
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
                        placeholder="••••••••"
                        value={values.password}
                        onChange={handleChange("password")}
                        aria-invalid={!!errors.password}
                      />
                      <FieldDescription>
                        Your secure account password.
                      </FieldDescription>
                      <FieldError>{errors.password}</FieldError>
                    </FieldContent>
                  </Field>
                </FieldGroup>

                {formError ? (
                  <Alert variant="destructive">
                    <AlertTitle>Login Failed</AlertTitle>
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                ) : null}

                {formMessage ? (
                  <Alert>
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{formMessage}</AlertDescription>
                  </Alert>
                ) : null}

                <CardFooter className="flex flex-col items-stretch gap-3 p-0">
                  <Button type="submit" className="rounded-2xl" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                  <Button asChild variant="ghost" className="rounded-2xl">
                    <Link to="/register">Create a new account</Link>
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
