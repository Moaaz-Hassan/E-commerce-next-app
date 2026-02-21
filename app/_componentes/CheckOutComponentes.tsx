"use client";

import { useRef, useState } from "react";
import { checkOutAction } from "../_services/CheckOutServices";

import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";

function CheckOutComponentes({ cartId }: { cartId: string }) {
  const city = useRef<null | HTMLInputElement>(null);
  const phone = useRef<null | HTMLInputElement>(null);
  const details = useRef<null | HTMLInputElement>(null);

  const [loding, setLoding] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function CheckOut() {
    if (city.current?.value && phone.current?.value && details.current?.value) {
      const shppingDetails = {
        city: city.current?.value,
        details: details.current?.value,
        phone: phone.current?.value,
      };

      setLoding(true);
      const respons = await checkOutAction(cartId, shppingDetails);
      if (respons?.status == "success") {
        location.href = respons.session.url;
      }

      setLoding(false);
    }
  }

  return (
    <div>
      <Button onPress={onOpen} className=" font-bold w-full " color="primary">
        CheckOut
      </Button>
      <Drawer
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerBody>
                <h2 className="mb-3 text-gray-800 text-2xl font-bold mt-2">
                  Add shipping address
                </h2>
                <p>Please , add your shipping address.</p>

                <div className=" flex flex-col gap-2 mt-4">
                  <Input
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="enter your city"
                    label="City"
                    type="text"
                    ref={city}
                  />
                  <Input
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="enter your details"
                    label="Details"
                    type="text"
                    ref={details}
                  />

                  <Input
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="enter your phone"
                    label="Phone"
                    type="text"
                    ref={phone}
                  />
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  disabled={loding}
                  isLoading={loding}
                  color="primary"
                  onPress={CheckOut}
                >
                  Save changes
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default CheckOutComponentes;
