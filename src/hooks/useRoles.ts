import { useEffect, useState, useCallback } from "react";
import { getRoles } from "../api/requests/roles";

type Role = {
  roleId: number;
  roleName: string;
  description: string;
};

type UseRolesResult = {
  roles: Role[];
  loading: boolean;
  error: string | null;
  refreshRoles: () => Promise<void>;
};

const useRoles = (): UseRolesResult => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRoles();
      const formattedRoles = response.data.result.map((item: { roleId: number; roleName: string }) => ({
        roleId: item.roleId,
        roleName: item.roleName,
        description: "IB User",
      }));
      setRoles(formattedRoles);
    } catch (errorMessage) {
      setError(`Failed to fetch roles, ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return { roles, loading, error, refreshRoles: fetchRoles };
};

export default useRoles;
