import { FcCheckmark } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import US from "assets/image/US.svg";
import FR from "assets/image/FR.svg";

export const CategoriesDataSource = [
  {
    key: "1",
    name: "Clothes",
    description:
      "Discover our favirites fashionable discoveries, a selection of cool items to integrate in your wardrobe. Compose a unique style with personality",
    position: 1,
    displayed: <FcCheckmark />,
  },
  {
    key: "2",
    name: "Accessories",
    description:
      "Items and accessories for your desk, kitchen or living room. Make your house a home with our eye-catching designs.",
    position: 2,
    displayed: <FcCheckmark />,
  },
  {
    key: "3",
    name: "Art",
    description:
      "Framed poster and vector images, all you need to give personality to your walls or bring your creative projects to life.",
    position: 3,
    displayed: <IoMdClose fill="#ff0000" />,
  },
];

export const LanguageDataSource = [
  {
    key: 1,
    flag: <img src={US} alt="US" />,
    name: "English (English)",
    iso: "en",
    language: "en-us",
    dateFormat: "m/d/Y",
    dateFormatFull: "m/d/Y H:i:s",
    enabled: <FcCheckmark />,
  },
  {
    key: 2,
    flag: <img src={FR} alt="FR" />,
    name: "Français (French)",
    iso: "en",
    language: "fr",
    dateFormat: "m/d/Y",
    dateFormatFull: "m/d/Y H:i:s",
    enabled: <FcCheckmark />,
  },
];
