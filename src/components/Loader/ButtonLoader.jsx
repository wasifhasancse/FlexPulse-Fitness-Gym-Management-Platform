const ButtonLoader = ({ text = "Loading..." }) => {
  return (
    <span className="inline-flex items-center justify-center gap-2">
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        aria-hidden="true"
      />
      <span>{text}</span>
    </span>
  );
};

export default ButtonLoader;
