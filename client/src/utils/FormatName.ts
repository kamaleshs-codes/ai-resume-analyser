export const formatName = (name: string): string => {
  const trimmedName = name.trim();

  if (!trimmedName) return "";

  return (
    trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase()
  );
};
