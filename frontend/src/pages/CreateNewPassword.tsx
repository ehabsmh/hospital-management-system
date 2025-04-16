import { useNavigate, useParams } from "react-router-dom";
import FormAccounts from "../ui/FormAccounts";
import { Button, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { checkPassword, setNewPassword } from "../services/apiAuth";
import { FormEvent, useEffect, useState } from "react";
import Loader from "../ui/Loader";
import { useAuth } from "../components/auth/useAuth";
import { toast } from "sonner";

function CreateNewPassword() {
  const { setUser, user } = useAuth();
  const { id: userId } = useParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function onCreatePassword(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (userId) {
        const data = await setNewPassword({ password, userId });

        console.log(data);
        if (data) {
          setUser(data?.user);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    function () {
      async function passwordCheck() {
        try {
          if (userId) {
            await checkPassword(userId);
          }
        } catch (err) {
          if (err instanceof Error) {
            toast.error(err.message);
            navigate("/");
          }
        }
      }

      if (user || user?._id === userId) {
        navigate("/");
      }

      if (!user) {
        passwordCheck();
      }
    },
    [user, userId, navigate]
  );

  return (
    <FormAccounts layerBgColor="bg-black/75">
      <form
        onSubmit={onCreatePassword}
        className="border rounded-md border-white/20 w-96 p-10 shadow-lg shadow-black/70"
      >
        <div className="w-full max-w-md px-1 mb-6">
          <p className="text-center text-sm text-red-400">{error}</p>
          <Field>
            <Label className="text-sm/6 font-medium text-white">
              Create Password
            </Label>
            <Input
              data-focus
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={clsx(
                `mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white`,
                `${
                  error
                    ? "data-[focus]:outline-red-500/60"
                    : "data-[focus]:outline-white/25"
                } focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2`
              )}
            />
          </Field>
          <div className="w-full max-w-md px-1">
            <Button
              type="submit"
              className="mt-3 block w-full rounded-lg border-none py-1.5 px-3 text-sm/6 text-white bg-primary duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
            >
              {isLoading ? <Loader size={15} /> : "Login"}
            </Button>
          </div>
        </div>
      </form>
    </FormAccounts>
  );
}

{
  /*  */
}
export default CreateNewPassword;
