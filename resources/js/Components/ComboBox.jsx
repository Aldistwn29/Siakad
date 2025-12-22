import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command';
import { Popover, PopoverTrigger } from '@/Components/ui/popover';
import { cn } from '@/lib/utils';
import { PopoverContent } from '@radix-ui/react-popover';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function ComboBox({ items, selectedItem, onSelect, placeholder = 'Pilih Item ...' }) {
    const [isOpen, setOpen] = useState(false);

    const handleSelect = (value) => {
        onSelect(value);
        setOpen(false);
    };
    return (
        <>
            <Popover open={isOpen} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isOpen}
                        className="w-full justify-between"
                        size="xl"
                    >
                        {items.find((item) => item.value === selectedItem)?.label ?? placeholder}
                        <IconChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="max-h-[--radix-popover-content-available-height] w-[--radix-povover-content-available-width] p-0"
                    align="star"
                >
                    <Command>
                        <CommandInput placeholder={placeholder}>
                            <CommandList>
                                <CommandGroup>
                                    {items.map((item, index) => {
                                        <CommandItem
                                            key={index}
                                            valeu={item.value}
                                            onSelect={(value) => handleSelect(value)}
                                        >
                                            {item.label}
                                            <IconCheck
                                                className={
                                                    (cn('ml-auto size-4'),
                                                    selectedItem === item.label ? 'opacity-100' : 'opacity-0')
                                                }
                                            />
                                        </CommandItem>;
                                    })}
                                </CommandGroup>
                            </CommandList>
                        </CommandInput>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
}
