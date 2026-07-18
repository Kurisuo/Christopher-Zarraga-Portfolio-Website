"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

function isRouteEnabled(pathname: string | null): boolean {
  if (!pathname) return false;

  if (pathname in routes) {
    return routes[pathname as keyof typeof routes];
  }

  const dynamicRoutes = ["/blog", "/work"] as const;
  for (const route of dynamicRoutes) {
    if (pathname.startsWith(route) && routes[route]) {
      return true;
    }
  }

  return false;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const routeEnabled = isRouteEnabled(pathname);
  const passwordRequired = Boolean(
    pathname && protectedRoutes[pathname as keyof typeof protectedRoutes],
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [authLoading, setAuthLoading] = useState(passwordRequired);

  useEffect(() => {
    if (!passwordRequired) {
      setAuthLoading(false);
      setIsAuthenticated(false);
      setError(undefined);
      return;
    }

    let cancelled = false;

    const checkAuth = async () => {
      setAuthLoading(true);
      setIsAuthenticated(false);

      try {
        const response = await fetch("/api/check-auth");
        if (!cancelled && response.ok) {
          setIsAuthenticated(true);
        }
      } finally {
        if (!cancelled) {
          setAuthLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, [pathname, passwordRequired]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (!routeEnabled) {
    return <NotFound />;
  }

  if (passwordRequired && authLoading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (passwordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
