import { FcCheckmark } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";

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
    displayed: <IoMdClose fill="red" />,
  },
];
