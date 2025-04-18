import { ModelResource, Resource } from "@/interfaces/ResourceType";
import { Tag } from "@/interfaces/TagType";
import { isValidImaage, resourceTypeToColor } from "@/lib/util";
import {
  Text,
  Box,
  Card,
  HStack,
  Avatar,
  Image,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router";
import { ResourceTypeBadge } from "../resources/ResourceTypeBadge";
import { ResourceTypeEnum } from "@/interfaces/ResourceTypeEnum";
import { ModelCardButton } from "../models/ModelCardButton";

export const ResourceCard = ({
  resource,
  appendTypeToUrl = false,
}: {
  resource: Resource;
  appendTypeToUrl?: boolean;
}) => {
  const author = resource.authors[0];

  const isValidImage = isValidImaage(resource.headerImage);

  resource.tags.sort((a, b) => a.value.localeCompare(b.value));

  const linkTo = resource.id;
  const linkToWithType = `${resource.type}/${resource.id}`;

  // Determine the link based on appendTypeToUrl
  const link = appendTypeToUrl ? linkToWithType : linkTo;

  return (
    <Box>
      <Card.Root overflow="hidden" size="md">
        <Link to={link}>
          {/* Image Container with Badge */}
          {isValidImage && (
            <Box position="relative" width="full">
              {/* Badge in the upper-left */}
              <ResourceTypeBadge
                type={resource.type}
                position="absolute"
                top="2"
                left="2"
                zIndex="1"
                boxShadow="md" // Optional: Shadow for visibility
              />

              {/* Full-width Image */}
              <Image
                src={resource.headerImage}
                alt={resource.name}
                width="100%" // Ensure full width
                height="200px"
                objectFit="cover"
              />
            </Box>
          )}

          <Card.Body
            gap="2"
            _hover={{ bg: resourceTypeToColor(resource.type) + ".100" }}
          >
            {/* Card Content */}
            <Card.Title>{resource.name}</Card.Title>
            {!isValidImage && (
              <Box>
                <ResourceTypeBadge type={resource.type} />
              </Box>
            )}
            <HStack flexWrap="wrap">
              {resource.tags.map((tag: Tag) => (
                <Badge
                  key={tag.id}
                  size="md"
                  rounded="md"
                  colorPalette={resourceTypeToColor(resource.type)}
                >
                  {tag.value}
                </Badge>
              ))}
            </HStack>
            <Text color="fg.muted" lineClamp={2}>
              {resource.description}
            </Text>
          </Card.Body>
        </Link>

        <Card.Footer justifyContent="space-between" pt={4}>
          {author && (
            <HStack>
              <Avatar.Root shape="full" size="sm">
                <Avatar.Fallback name={author} />
                <Avatar.Image src={author} />
              </Avatar.Root>

              <Box>
                <Text fontWeight="bold">{author}</Text>
              </Box>
            </HStack>
          )}

          {(resource.type as ResourceTypeEnum) === ResourceTypeEnum.MODEL && (
            <ModelCardButton model={resource as ModelResource} />
          )}
        </Card.Footer>
      </Card.Root>
    </Box>
  );
};
