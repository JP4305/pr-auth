import React from 'react'
import { Button, Heading, Hr, Html, Text } from "@react-email/components";


export default function ForgotPasswordEmail({ params }: { params: { name: string, url: string } }) {
    return (
        <Html>
            <Heading as='h2'>Hello {params.name}</Heading>
            <Text>We recieved the reset password request. If its not you please ignore it!</Text>
            <Button href={params.url} style={{ background: "#000", color: "#FFFFFF", padding: "20px 20px 20px 20px" }} >
                Click Me
            </Button>
            
            <Hr />

            <Heading as='h3'>Regards</Heading>
            <Text>The Special Character</Text>

        </Html>
    );
}
