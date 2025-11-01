import { useState } from "react"
import { Popover, PopoverTrigger } from "@/Components/ui/popover";
import { Button } from "./ui/button";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { PopoverContent } from "@radix-ui/react-popover";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";

export function ComboBox({ items, selectedItem, onSelect, placeholder = "Pilih Item ..." }) {
    const [isOpen, setOpen] = useState(false);

    const handleSelect = (value) => {
        onSelect(value);
        setOpen(false);
    }
    return (
        <Popover open={isOpen} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" ariaExpanded={isOpen} className="justify-between w-full" size='xl'>
                    {items.find((item) => item.value === selectedItem)?.label ?? placeholder}
                    <IconChevronDown className="ml-2 opacity-50 size-4 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-povover-content-available-width] p-0" align="star">
                <Command>
                    <CommandInput placeholder={placeholder}>
                        <CommandList>
                            <CommandGroup>
                                {items.map((item, index) => {
                                    <CommandItem key={index} valeu={item.value} onSelect={(value) => handleSelect(value)}>
                                        {item.label}
                                        <IconCheck className={cn("ml-auto size-4"), selectedItem === item.label ? 'opacity-100' : 'opacity-0'} />
                                    </CommandItem>
                                })}
                            </CommandGroup>
                        </CommandList>
                    </CommandInput>
                </Command>
            </PopoverContent>
        </Popover> =
    )
}