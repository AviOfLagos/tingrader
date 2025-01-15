import { signInAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="h-full flex-1 flex flex-col min-w-64  p-4 item-center justify-center bg-slate-400/10 backdrop-blur-sm border border-dashed border-foreground/60 rounded-lg">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
        <div className="flex  gap-2">
          <p className="text-sm text-foreground/60 ">
            Don&apos;t have an account?{" "}
            <Link
              className="text-foreground/60 font-medium underline"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 mt-10 bg-slate-200/10 border border-dashed border-foreground/60 rounded-lg">
        <h1>Test Info</h1>

        <p>Email: hostelbros+2@gmail.com</p>
        <p>Password: password2</p>
        <p>Username: hostelbros</p>
      </div>
    </form>
    
  );
}
