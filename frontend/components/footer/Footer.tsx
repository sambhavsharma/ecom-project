import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";

const Header = (() => {
  const colorMode = "light"; // useContext(ThemeContext);
  const tabs = [
    {
      title: "Designer",
    },
    {
      title: "Menswear",
    },
    {
      title: "Womenswear",
    },
    {
      title: "Sneakers",
    },
    {
      title: "Staff Picks",
    },
    {
      title: "Collections",
    },
    {
      title: "Editorial",
    }
  ];

    return (
        <Box className="px-16 w-full border-b hidden md:flex border-outline-100 min-h-15 mt-4 ">
            
        </Box>
    );
});
export default Header;