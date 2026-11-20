interface SectionTitleProps {
  title: string;
  description?: string;
}

const SectionTitle = ({ title, description }: SectionTitleProps) => {
  return (
    <div className='mb-6'>
      <h2 className='text-2xl font-bold text-primary'>{title}</h2>

      {description && (
        <p className='mt-2 text-sm text-text-muted'>{description}</p>
      )}
    </div>
  );
};

export default SectionTitle;
