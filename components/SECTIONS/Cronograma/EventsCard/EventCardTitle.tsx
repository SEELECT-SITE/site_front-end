import Text from "@/components/Text";

export default function EventCardTitle({ title }: { title: string }) {
  return (
    <Text className="font-bold lg:text-lg uppercase text-base mb-2 text-white">
      {title}
    </Text>
  );
}
