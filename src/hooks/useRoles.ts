import { useEffect, useState } from "react";
import { getRoles } from "../api/requests/roles";


type Role = {
  id: number;
  role: string;
};

type UseRolesResult = {
  roles: Role[];
  loading: boolean;
  error: string | null;
};

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

const useRoles = (): UseRolesResult => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await getRoles();
        const formattedRoles = response.data.map((item: { role: string }, index: number) => ({
            id: index,
            role: capitalize(item.role),
          }));
        setRoles(formattedRoles);
      } catch (errorMessage) {
        setError(`Failed to fetch roles, ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, loading, error };
};

export default useRoles;
