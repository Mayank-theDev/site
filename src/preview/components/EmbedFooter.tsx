import React from "react"
import styled, { css } from "styled-components"
import { formatTimestamp } from "../../message/helpers/formatTimestamp"
import { Footer } from "../../message/types/Footer"

const Container = styled.div<{ hasThumbnail?: boolean }>`
  margin: 8px 0 0;

  display: flex;
  align-items: center;

  grid-row: auto / auto;
  grid-column: 1 / 2;

  ${({ hasThumbnail }) =>
    hasThumbnail &&
    css`
      grid-column: 1 / 3;
    `}
`

const FooterImage = styled.img`
  width: 20px;
  height: 20px;

  margin: 0 8px 0 0;

  object-fit: contain;
  border-radius: 50%;
`

const FooterText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text.muted};
  line-height: 1rem;

  ${({ theme }) =>
    theme.appearance.color === "light" &&
    css`
      @media (max-resolution: 1dppx) {
        font-weight: 500;
      }
    `}
`

const FooterSeparator = styled.span`
  display: inline-block;
  margin: 0 4px;

  font-weight: 700;
  color: ${({ theme }) => theme.backgroundModifier.accent};
`

export type EmbedFooterProps = {
  footer?: Footer
  timestamp?: string
  hasThumbnail?: boolean
}

export function EmbedFooter(props: EmbedFooterProps) {
  const { footer = {}, timestamp, hasThumbnail } = props
  const { text, iconUrl } = footer

  const hasIcon = /https?:\/\/.+/i.test(iconUrl ?? "")

  return (
    <Container hasThumbnail={hasThumbnail}>
      {hasIcon && <FooterImage src={iconUrl} alt="Footer image" />}
      <FooterText>
        {text}
        {text && timestamp && <FooterSeparator>•</FooterSeparator>}
        {timestamp && formatTimestamp(timestamp)}
      </FooterText>
    </Container>
  )
}