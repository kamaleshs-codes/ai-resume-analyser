import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import FormField from "../../components/ui/FormFields";

import { loginApi, registerApi } from "../../api/auth.api";
import { useAuth } from "../../hooks/useAuth";

type AuthMode = "login" | "register";

interface AuthPageProps {
  mode: AuthMode;
}

const AuthPage = ({ mode }: AuthPageProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegister = mode === "register";

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const switchMode = () => {
    clearMessages();
    navigate(isRegister ? "/login" : "/register");
  };

  const handleGoogleAuth = () => {
    setError(
      "Google authentication is not configured yet. Complete the Google OAuth setup to enable this option.",
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessages();

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isRegister) {
        await registerApi({
          username: username.trim(),
          email: email.trim(),
          password,
        });

        setSuccess("Account created successfully. You can now sign in.");
        setPassword("");
        setConfirmPassword("");

        window.setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1000);

        return;
      }

      const response = await loginApi({
        email: email.trim(),
        password,
      });

      login(response.data.token, response.data.user);
      navigate("/home", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;

        if (data?.errors?.length) {
          setError(data.errors[0].message);
        } else if (data?.message) {
          setError(data.message);
        } else if (err.request) {
          setError("Unable to connect to the server. Please try again.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='h-dvh overflow-hidden bg-background'>
      <div className='mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center gap-6 px-4 py-4 md:flex-row md:gap-16 md:px-8 md:py-6'>
        {/* Branding stays fixed outside the scrollable card */}
        <section className='hidden min-w-0 flex-1 md:flex md:flex-col md:justify-center'>
          <h1 className='text-5xl font-bold text-primary'>ResumePilot AI</h1>

          <p className='mt-5 text-lg leading-8 text-text-muted'>
            Build professional ATS-friendly resumes with AI assistance. Generate
            resumes faster, optimize them for recruiters, and land your dream
            job.
          </p>

          <div className='mt-10 space-y-4 text-text'>
            <p>✨ AI Resume Generation</p>
            <p>📄 ATS Optimization</p>
            <p>🎨 Professional Templates</p>
          </div>
        </section>

        {/* Fixed-height authentication area */}
        <section className='flex w-full min-w-0 items-center justify-center md:w-[28rem] md:flex-none'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className='flex h-full min-h-0 w-full'>
              <Card className='flex h-120 min-h-0 w-full flex-col pr-1 overflow-hidden'>
                {/* Only this inner area scrolls */}
                <div
                  className='
    auth-scrollbar
    min-h-0 flex-1
    overflow-y-auto overscroll-contain
   px-4
    py-2
  '>
                  <div className='pr-5'>
                    <h2 className='text-center text-3xl font-bold'>
                      {isRegister ? "Create Account" : "Welcome Back"}
                    </h2>

                    <p className='mt-2 text-center text-text-muted'>
                      {isRegister
                        ? "Create an account to get started with ResumePilot AI"
                        : "Sign in to continue to ResumePilot AI"}
                    </p>

                    <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
                      {isRegister && (
                        <FormField label='Username' htmlFor='username'>
                          <Input
                            id='username'
                            type='text'
                            placeholder='Choose a username'
                            value={username}
                            onChange={(event) => {
                              setUsername(event.target.value);
                              clearMessages();
                            }}
                            required
                            autoComplete='username'
                          />
                        </FormField>
                      )}

                      <FormField label='Email' htmlFor='email'>
                        <Input
                          id='email'
                          type='email'
                          placeholder='Enter your email'
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                            clearMessages();
                          }}
                          required
                          autoComplete='email'
                        />
                      </FormField>

                      <FormField label='Password' htmlFor='password'>
                        <Input
                          id='password'
                          type='password'
                          placeholder={
                            isRegister
                              ? "Create a password"
                              : "Enter your password"
                          }
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                            clearMessages();
                          }}
                          required
                          autoComplete={
                            isRegister ? "new-password" : "current-password"
                          }
                        />
                      </FormField>

                      {isRegister && (
                        <FormField
                          label='Confirm Password'
                          htmlFor='confirmPassword'>
                          <Input
                            id='confirmPassword'
                            type='password'
                            placeholder='Reenter password'
                            value={confirmPassword}
                            onChange={(event) => {
                              setConfirmPassword(event.target.value);
                              clearMessages();
                            }}
                            required
                            autoComplete='new-password'
                          />
                        </FormField>
                      )}

                      {error && (
                        <p
                          role='alert'
                          className='rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400'>
                          {error}
                        </p>
                      )}

                      {success && (
                        <p
                          role='status'
                          className='rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400'>
                          {success}
                        </p>
                      )}

                      <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting
                          ? "Please wait..."
                          : isRegister
                            ? "Create Account"
                            : "Login"}
                      </Button>
                    </form>

                    {/* Google authentication placeholder */}
                    <div className='my-6 flex items-center gap-3'>
                      <div className='h-px flex-1 bg-white/10' />
                      <span className='text-sm text-text-muted'>OR</span>
                      <div className='h-px flex-1 bg-white/10' />
                    </div>

                    <Button
                      type='button'
                      onClick={handleGoogleAuth}
                      disabled={isSubmitting}>
                      <span className='mr-2 font-bold'>G</span>
                      {isRegister
                        ? "Create account with Google"
                        : "Continue with Google"}
                    </Button>

                    <p className='mt-6 pb-2 text-center text-sm text-text-muted'>
                      {isRegister
                        ? "Already have an account? "
                        : "Don't have an account? "}

                      <button
                        type='button'
                        onClick={switchMode}
                        className='font-semibold text-accent hover:underline'>
                        {isRegister ? "Login" : "Register"}
                      </button>
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
};

export default AuthPage;
