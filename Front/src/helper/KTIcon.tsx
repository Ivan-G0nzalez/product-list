import { FC } from 'react';

type Props = {
  className?: string;
  iconType?: 'duotone' | 'solid' | 'outline';
  iconName: string;
};

const ICON_PATHS: Record<string, number> = {
  'icon-example': 2, // Aquí defines cuántas partes tiene el ícono si es duotono
  // Agrega más íconos y el número de partes para duotono
};

const KTIcon: FC<Props> = ({
  className = '',
  iconType = 'outline',
  iconName,
}) => {
  const iconClass = `ki-${iconType} ki-${iconName} ${className}`;

  if (iconType === 'duotone' && ICON_PATHS[iconName]) {
    return (
      <i className={iconClass}>
        {[...Array(ICON_PATHS[iconName])].map((_, i) => (
          <span
            key={`${iconType}-${iconName}-path-${i + 1}`}
            className={`path${i + 1}`}
          />
        ))}
      </i>
    );
  }

  return <i className={iconClass} />;
};

export { KTIcon };
