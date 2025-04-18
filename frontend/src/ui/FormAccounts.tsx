import { ReactNode } from "react";
import styled from "styled-components";

const AccountsPage = styled.section`
  background-image: url("/images/login-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 75% 25%;
`;
function FormAccounts({
  children,
  layerBgColor,
}: {
  children: ReactNode;
  layerBgColor: string;
}) {
  return (
    <AccountsPage className="h-screen bg-dark">
      <div className={`layer h-full dark:bg-black/75 ${layerBgColor}`}>
        <div className="container h-full lg:w-1/2 mx-auto flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </AccountsPage>
  );
}

export default FormAccounts;
