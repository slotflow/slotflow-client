import { ProviderCardProps } from "@/shared/interface/componentInterface";
import { Clock3, MapPin, Star } from "lucide-react";

const HeroProviderCard = ({
  name,
  category,
  rating,
  location,
  time,
}: ProviderCardProps) => {
  return (
    <div
      className="
        rounded-2xl
        border
        bg-background
        p-4
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      <div className="flex justify-between">

        <div className="flex gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-primary/10
              font-semibold
              text-primary
            "
          >
            {name.charAt(0)}
          </div>

          <div>

            <h5 className="font-semibold">
              {name}
            </h5>

            <p className="text-sm text-muted-foreground">
              {category}
            </p>

            <div className="mt-2 flex gap-4 text-xs text-muted-foreground">

              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {location}
              </span>

              <span className="flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />
                {time}
              </span>

            </div>

          </div>

        </div>

        <div className="flex items-start gap-1">

          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

          <span className="text-sm font-semibold">
            {rating}
          </span>

        </div>

      </div>
    </div>
  );
}

export default HeroProviderCard;