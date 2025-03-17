import { useEffect, useState } from "react";
import { getRoles } from "../api/requests/roles";

type Role = {
  id: number;
  text: string;
  description: string;
};

type UseRolesResult = {
  roles: Role[];
  loading: boolean;
  error: string | null;
};

const useRoles = (): UseRolesResult => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await getRoles();
          const formattedRoles = response.data.map((item: { id: number; text: string }) => ({
            id: item.id,
            text: item.text,
            description: "IB User",
          }));
          setRoles(formattedRoles);
        } catch (errorMessage) {
          setError(`Failed to fetch roles, ${errorMessage}`);
        } finally {
          setLoading(false);
        }
      }, 1000)
    };

    fetchRoles();
  }, []);

  return { roles, loading, error };
};

export default useRoles;
