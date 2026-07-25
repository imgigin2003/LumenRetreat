import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, Lock } from 'lucide-react';
import { PageTransition } from '@/ui/PageTransition';
import { PageHeader } from '@/ui/PageHeader';
import { Input, FormRow } from '@/ui/Input';
import { Button } from '@/ui/Button';
import { useUser } from '@/features/auth/useUser';
import { useUpdateUser } from '@/features/auth/useUpdateUser';
import { getInitials } from '@/utils/helpers';

export default function Account() {
  const { user } = useUser();
  const currentName = (user?.user_metadata?.full_name as string) ?? 'Retreat Host';
  const currentAvatar = user?.user_metadata?.avatar_url as string | undefined;

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader title="Account" subtitle="Update your name, avatar and password." />
        <div className="grid gap-5 lg:grid-cols-2">
          <ProfileCard name={currentName} email={user?.email ?? ''} avatar={currentAvatar} />
          <PasswordCard />
        </div>
      </div>
    </PageTransition>
  );
}

function ProfileCard({ name, email, avatar }: { name: string; email: string; avatar?: string }) {
  const { updateUser, isPending } = useUpdateUser();
  const fileRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(name);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(avatar);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    updateUser(
      { fullName, avatar: file },
      { onSuccess: () => setFile(null) },
    );
  }

  return (
    <form onSubmit={onSave} className="glass space-y-5 p-6 sm:p-7">
      <h2 className="text-lg font-semibold text-content">Profile</h2>

      <div className="flex items-center gap-4">
        {preview ? (
          <img src={preview} alt="" className="h-16 w-16 rounded-2xl object-cover ring-1 ring-line/15" />
        ) : (
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-gold-400/30 to-teal-500/25 text-lg font-semibold text-content ring-1 ring-line/15">
            {getInitials(fullName)}
          </span>
        )}
        <div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPick} />
          <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
            <Upload className="h-4 w-4" /> Change avatar
          </Button>
          <p className="mt-1.5 text-xs text-content-muted">JPG or PNG.</p>
        </div>
      </div>

      <FormRow label="Email" htmlFor="email" hint="Your login email can’t be changed in the demo.">
        <Input id="email" value={email} disabled />
      </FormRow>

      <FormRow label="Full name" htmlFor="name">
        <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </FormRow>

      <div className="flex justify-end">
        <Button type="submit" loading={isPending}>
          Save profile
        </Button>
      </div>
    </form>
  );
}

interface PasswordValues {
  password: string;
  passwordConfirm: string;
}

function PasswordCard() {
  const { updateUser, isPending } = useUpdateUser();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<PasswordValues>();

  function onSubmit({ password }: PasswordValues) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass space-y-5 p-6 sm:p-7">
      <h2 className="text-lg font-semibold text-content">Password</h2>

      <FormRow label="New password" htmlFor="password" error={errors.password?.message} hint="Minimum 6 characters">
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="h-4 w-4" />}
          invalid={!!errors.password}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'At least 6 characters' },
          })}
        />
      </FormRow>

      <FormRow label="Confirm password" htmlFor="passwordConfirm" error={errors.passwordConfirm?.message}>
        <Input
          id="passwordConfirm"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="h-4 w-4" />}
          invalid={!!errors.passwordConfirm}
          {...register('passwordConfirm', {
            validate: (v) => v === getValues().password || 'Passwords do not match',
          })}
        />
      </FormRow>

      <div className="flex justify-end">
        <Button type="submit" loading={isPending}>
          Update password
        </Button>
      </div>
    </form>
  );
}
