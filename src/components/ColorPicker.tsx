interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({
  label,
  color,
  onChange,
}: ColorPickerProps) {
  return (
    <div className="flex flex-col items-center">
      <label className="mb-2">{label}</label>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 h-16 cursor-pointer"
      />
    </div>
  );
}
