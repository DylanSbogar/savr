import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  Input,
} from "@/components/ui"
import { useForm } from "@tanstack/react-form"
import { loginSchema } from "../utils"
import { useNavigate } from "@tanstack/react-router"
import { GoogleLogoIcon, KeyIcon } from "@phosphor-icons/react"
import { TextMorph } from "torph/react"
import { useMutation } from "@tanstack/react-query"
import { loginMutation } from "@/api/@tanstack/react-query.gen"

interface Props {
  children: React.ReactElement
}

export const LoginDialog = ({ children }: Props) => {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: { emailOrUsername: "", password: "" },
    validators: { onSubmit: loginSchema, onChange: loginSchema },
    onSubmit: async ({ value }) => {
      login.mutate({
        body: {
          emailOrUsername: value.emailOrUsername,
          password: value.password,
        },
      })
    },
  })

  const login = useMutation({
    ...loginMutation(),
    onSuccess: () => {
      console.log("Success!")
      navigate({ to: "/home" })
    },
    onError: () => {
      console.log("Error.")
      if (import.meta.env.DEV) navigate({ to: "/home" })
    },
  })

  return (
    <Dialog>
      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <DialogTrigger render={children} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <TextMorph>Log in to SAVR</TextMorph>
            </DialogTitle>
          </DialogHeader>
          <FieldGroup className="px-4 py-2">
            <form.Field
              name="emailOrUsername"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="emailOrUsername">
                      Email or username
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="johndoe"
                      autoComplete="off"
                      disabled={login.isPending}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="********"
                      autoComplete="off"
                      disabled={login.isPending}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <FieldSeparator>or</FieldSeparator>
            <Button size="lg">
              <GoogleLogoIcon />
              <span>Continue with Google</span>
            </Button>
            <Button size="lg">
              <KeyIcon />
              <span>Continue with Passkey</span>
            </Button>
          </FieldGroup>
          <DialogFooter className="justify-end!">
            <DialogClose
              render={
                <Button variant="outline">
                  <span>Cancel</span>
                </Button>
              }
            />
            <form.Subscribe
              selector={(state) => ({
                isValid: state.isValid,
                isDirty: state.isDirty,
              })}
            >
              {({ isValid, isDirty }) => (
                <Button
                  type="submit"
                  form="login-form"
                  disabled={login.isPending || !isValid || !isDirty}
                >
                  Log in
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
