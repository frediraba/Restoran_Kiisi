import React from "react";
﻿import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { NavigationBar } from "@/components/navigation/navigation-bar";

describe("NavigationBar", () => {
  it("renders required primary, secondary, and mobile links", () => {
    const primary = ["Menu", "Order", "Reserve", "Locations", "Contact"].map((label, index) => ({
      id: `primary-${index}`,
      label,
      href: label === "Menu" ? "/menu" : `/${label.toLowerCase()}`,
      type: "PRIMARY" as const,
    }));
    const secondary = ["Offers", "Gift Cards", "Catering", "Events", "Careers", "FAQ", "Privacy", "Terms"].map(
      (label, index) => ({
        id: `secondary-${index}`,
        label,
        href: `/${label.toLowerCase().replace(/\s+/g, "-")}`,
        type: "SECONDARY" as const,
      }),
    );
    const mobile = ["Menu", "Order", "Reserve", "Account", "Locations"].map((label, index) => ({
      id: `mobile-${index}`,
      label,
      href: label === "Menu" ? "/menu" : `/${label.toLowerCase()}`,
      type: "MOBILE" as const,
    }));

    render(<NavigationBar primary={primary} secondary={secondary} mobile={mobile} />);

    [...primary, ...secondary, ...mobile].forEach((link) => {
      const instances = screen.getAllByRole("link", { name: link.label });
      expect(instances.length).toBeGreaterThan(0);
      instances.forEach((element) => expect(element).toBeVisible());
    });
  });
});
