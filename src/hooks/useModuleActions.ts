import { useEffect, useState } from "react";
import { getModuleActions } from "../api/requests/roles";

const useModuleActions = () => {
  const [moduleActions, setModuleActions] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await getModuleActions();
        setModuleActions(response.data);
      } catch (errorMessage) {
        setError(`Failed to fetch roles, ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { moduleActions, loading, error };
};

export default useModuleActions;
